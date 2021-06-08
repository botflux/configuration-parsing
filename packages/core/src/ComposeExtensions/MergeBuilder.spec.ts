import {ComposedConfigurationFactory} from '../Compose'
import {createMergeBuilder} from './MergeBuilder'

type MyConfigurationOptions = { baseUrl1: string }
type MyConfiguration = { anotherServiceUrl: string }

class FakeConfigurationFactory implements ComposedConfigurationFactory<MyConfiguration, MyConfigurationOptions>{
    create(options: MyConfigurationOptions): Promise<MyConfiguration> {
        return Promise.resolve({ anotherServiceUrl: `${options.baseUrl1}/foo/bar` })
    }
}

type MyConfigurationOptions2 = { baseUrl2: string }
type MyConfiguration2 = { someServiceUrl: string }

class FakeConfigurationFactory2 implements ComposedConfigurationFactory<MyConfiguration2, MyConfigurationOptions2> {
    create(options: MyConfigurationOptions2): Promise<MyConfiguration2> {
        return Promise.resolve({ someServiceUrl: `${options.baseUrl2}/hello/world` })
    }
}

describe('merge configuration from multiple sources', function () {
    it('should merge configuration from multiple sources', async function () {
        // Arrange
        const factory1 = new FakeConfigurationFactory()
        const factory2 = new FakeConfigurationFactory2()

        // Act
        const mergedFactory = createMergeBuilder()
            .merge(factory1)
            .merge(factory2)
            .build()

        const configuration = await mergedFactory.create({
            baseUrl1: 'https://hello.a',
            baseUrl2: "https://foo.bar"
        })

        // Assert
        expect(configuration).toEqual({
            anotherServiceUrl: 'https://hello.a/foo/bar',
            someServiceUrl: 'https://foo.bar/hello/world'
        })
    })

    it('should merge and map the configurations', async function () {
        // Arrange
        const factory1 = new FakeConfigurationFactory()
        const factory2 = new FakeConfigurationFactory2()

        // Act
        const mergedFactory = createMergeBuilder()
            .merge(factory1, {
                mapConfiguration: configuration => ({ foo: configuration })
            })
            .merge(factory2, {
                mapConfiguration: configuration => ({ bar: configuration })
            })
            .build()

        const configuration = await mergedFactory.create({
            baseUrl1: 'https://hello.a',
            baseUrl2: "https://foo.bar"
        })

        // Assert
        expect(configuration).toEqual({
            foo: {
                anotherServiceUrl: 'https://hello.a/foo/bar'
            },
            bar: {
                someServiceUrl: 'https://foo.bar/hello/world'
            }
        })
    })

    it('should map configurations options', async function () {
        // Arrange
        const factory1 = new FakeConfigurationFactory()
        const factory2 = new FakeConfigurationFactory2()

        // Act
        const mergedFactory = createMergeBuilder()
            .merge(factory1, {
                mapConfiguration: configuration => ({ foo: configuration }),
                mapLoaderOptions: (options: { foo: MyConfigurationOptions }) => options.foo
            })
            .merge(factory2, {
                mapConfiguration: (configuration) => ({ bar: configuration }),
                mapLoaderOptions: (options: { world: MyConfigurationOptions2 }) => options.world
            })
            .build()

        const configuration = await mergedFactory.create({ foo: { baseUrl1: 'http://dev.dev' }, world: { baseUrl2: 'https://a.b' } })

        // Assert
        expect(configuration).toEqual({
            foo: {
                anotherServiceUrl: 'http://dev.dev/foo/bar'
            },
            bar: {
                someServiceUrl: 'https://a.b/hello/world'
            }
        })
    })
})
