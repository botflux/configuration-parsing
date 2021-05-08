import {ComposedConfigurationFactory} from '../Compose'
import {createCacheableConfigurationFactory, TimeInterval} from './CacheableConfigurationFactory'

class FakeConfigurationFactory implements ComposedConfigurationFactory<{ hello: string }, undefined> {
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
            { reloadEvery: TimeInterval.hours(1) },
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
            { reloadEvery: TimeInterval.hours(1) },
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
            { reloadEvery: TimeInterval.hours(1) },
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

describe('#TimeInterval', function () {
    it('should create a time interval from ms', function () {
        // Act
        const timeInterval = TimeInterval.ms(1000)

        // Assert
        expect(timeInterval.getMs()).toBe(1000)
    })

    it('should create a time interval from seconds', function () {
        // Act
        const timeInterval = TimeInterval.seconds(2)

        // Assert
        expect(timeInterval.getMs()).toBe(2000)
    })

    it('should create a time interval from minutes', function () {
        // Act
        const timeInterval = TimeInterval.minutes(3)

        // Assert
        expect(timeInterval.getMs()).toBe(180000)
    })

    it('should create a time interval from hours', function () {
        // Act
        const timeInterval = TimeInterval.hours(1)

        // Assert
        expect(timeInterval.getMs()).toBe(3600000)
    })

    it('should associate multiple date interval', function () {
        // Act
        const timeInterval = TimeInterval.hours(1)
            .and(TimeInterval.minutes(30))
            .and(TimeInterval.seconds(4))
            .and(TimeInterval.ms(500))

        // Assert
        expect(timeInterval.getMs()).toBe(5404500)
    })
})
