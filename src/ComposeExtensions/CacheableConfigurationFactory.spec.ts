import {ComposedConfigurationFactory} from '../Compose'
import {createCacheableConfigurationFactory} from './CacheableConfigurationFactory'
import {createClock} from '../Clock'

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
            createClock(() => new Date('2020-06-08 12:56:34')),
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
        const myFactory = new FakeConfigurationFactory()
        myFactory.create = jest.fn(myFactory.create)
        const cacheableFactory = createCacheableConfigurationFactory(
            myFactory,
            { reloadAfterMs: 3600000 },
            createClock(() => new Date('2020-06-08 12:56:34')),
            () => new Date('2020-06-08 13:56:37')
        )

        // Act
        await cacheableFactory.create()
        await cacheableFactory.create()

        // Assert
        expect(myFactory.create).toBeCalledTimes(1)
    })
})
