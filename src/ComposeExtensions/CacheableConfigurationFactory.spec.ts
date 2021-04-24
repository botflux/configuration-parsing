import {ComposedConfigurationFactory} from '../Compose'
import {createCacheableConfigurationFactory} from './CacheableConfigurationFactory'

class FakeConfigurationFactory implements ComposedConfigurationFactory<{ hello: string }> {
    create(): Promise<{ hello: string }> {
        return Promise.resolve({ hello: 'world' });
    }
}

describe('#CacheableConfigurationFactory', function () {
    it('should load the configuration the first time', async function () {
        // Arrange
        const myFactory = new FakeConfigurationFactory()
        myFactory.create = jest.fn(myFactory.create)
        const cacheableFactory = createCacheableConfigurationFactory(
            myFactory,
            { reloadAfterMs: 3600000 },
            () => new Date('2020-06-08 12:56:37')
        )

        // Act
        await cacheableFactory.create()
        await cacheableFactory.create()

        // Assert
        expect(myFactory.create).toBeCalledTimes(1)
    })

    it('should load the configuration only when the delay has passed', async function () {
        // Arrange
        let currentTime = new Date('2020-06-08 13:56:37')

        const myFactory = new FakeConfigurationFactory()
        myFactory.create = jest.fn(myFactory.create)
        const cacheableFactory = createCacheableConfigurationFactory(
            myFactory,
            { reloadAfterMs: 3600000 },
            () => currentTime
        )

        // Act
        await cacheableFactory.create()
        currentTime = new Date('2020-06-08 14:56:39')
        await cacheableFactory.create()

        // Assert
        expect(myFactory.create).toBeCalledTimes(2)
    })

    it('should load the configuration after the delay has passed twice', async function () {
        // Arrange
        let currentTime = new Date('2020-06-08 13:56:37')

        const myFactory = new FakeConfigurationFactory()
        myFactory.create = jest.fn(myFactory.create)
        const cacheableFactory = createCacheableConfigurationFactory(
            myFactory,
            { reloadAfterMs: 3600000 },
            () => currentTime
        )

        // Act
        await cacheableFactory.create()
        currentTime = new Date('2020-06-08 14:56:39')
        await cacheableFactory.create()
        currentTime = new Date('2020-06-08 15:56:39')
        await cacheableFactory.create()

        // Assert
        expect(myFactory.create).toBeCalledTimes(3)
    })
})
