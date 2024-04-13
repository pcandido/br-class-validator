import { validate } from 'class-validator'
import { IsDate } from '../decorators'

class DateTest {

    constructor(date: string) {
        this.date = date
    }

    @IsDate()
    date: string

}

describe('IsDate', () => {

    it('should not return errors if date is valid', async () => {
        const sut = new DateTest('31/01/2025')
        const result = await validate(sut)
        expect(result).toHaveLength(0)
    })

    it('should return an error if date is invalid', async () => {
        const sut = new DateTest('01/31/2025')
        const result = await validate(sut)
        expect(result).toMatchObject([{ constraints: { isDate: 'date must be a valid brazilian formatted date' } }])
    })

})
