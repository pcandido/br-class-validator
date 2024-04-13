import { validate } from 'class-validator'
import { IsPhone } from '../decorators'

class PhoneTest {

    constructor(phone: string) {
        this.phone = phone
    }

    @IsPhone()
    phone: string

}

describe('IsPhone', () => {

    it('should not return errors if phone is valid', async () => {
        const sut = new PhoneTest('(11) 99876 1234')
        const result = await validate(sut)
        expect(result).toHaveLength(0)
    })

    it('should return an error if phone is invalid', async () => {
        const sut = new PhoneTest('(11) 1234 12')
        const result = await validate(sut)
        expect(result).toMatchObject([{ constraints: { isPhone: 'phone must be a valid phone' } }])
    })

})
