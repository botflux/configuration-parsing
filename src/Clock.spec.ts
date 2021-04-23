import {createClock} from './Clock'


describe('#Clock', function () {
    describe('#Clock.isBefore', function () {
        it('should return true when date is before the clock', function () {
            // Arrange
            const clock = createClock(() => new Date('2020-04-20'))

            // Act
            const isBefore = clock.isBefore(new Date('2020-04-19'))

            // Assert
            expect(isBefore).toBe(true)
        })

        it('should return false when date is after the clock', function () {
            // Arrange
            const clock = createClock(() => new Date('2020-04-20'))

            // Act
            const isBefore = clock.isBefore(new Date('2020-06-20'))

            // Assert
            expect(isBefore).toBe(false)
        })
    })

    describe('#Clock.isAfter', function () {
        it('should return true when date is after the clock', function () {
            // Arrange
            const clock = createClock(() => new Date('2020-04-20'))

            // Act
            const isAfter = clock.isAfter(new Date('2020-06-19'))

            // Assert
            expect(isAfter).toBe(true)
        })

        it('should return false when date is before the clock', function () {
            // Arrange
            const clock = createClock(() => new Date('2020-04-20'))

            // Act
            const isAfter = clock.isAfter(new Date('2020-01-19'))

            // Assert
            expect(isAfter).toBe(false)
        })
    })
})
