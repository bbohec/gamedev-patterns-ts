import { describe, it } from 'mocha'
import chai = require('chai');
import { Color } from '.'
chai.use(require('chai-spies'))
chai.use(require('chai-dom'))
const expect = chai.expect
describe('>>> Color', () => {
    it('should instantiate with provided values', () => {
        const rgba = new Color(1, 2, 3, 0.1)
        expect(rgba.Red).equal(1)
        expect(rgba.Green).equal(2)
        expect(rgba.Blue).equal(3)
        expect(rgba.Alpha).equal(0.1)
    })
    it('should throw an error if provided values are incorrect', () => {
        expect(() => new Color(266, 2, 3, 0.1)).to.throw(/Red/)
        expect(() => new Color(-1, 2, 3, 0.1)).to.throw(/Red/)
        expect(() => new Color(1.3, 2, 3, 0.1)).to.throw(/Red/)
        expect(() => new Color(255, 266, 3, 0.1)).to.throw(/Green/)
        expect(() => new Color(255, -1, 3, 0.1)).to.throw(/Green/)
        expect(() => new Color(255, 2.5, 3, 0.1)).to.throw(/Green/)
        expect(() => new Color(255, 25, 266, 0.1)).to.throw(/Blue/)
        expect(() => new Color(255, 25, -2, 0.1)).to.throw(/Blue/)
        expect(() => new Color(255, 0, 2.5, 0.1)).to.throw(/Blue/)
        expect(() => new Color(255, 255, 255, -1)).to.throw(/Alpha/)
        expect(() => new Color(255, 255, 255, 1.2)).to.throw(/Alpha/)
    })
    it('should convert to string', () => {
        const rgba = new Color(1, 2, 3, 0.1)
        expect(rgba.AsString()).equal('rgba(1, 2, 3, 0.1)')
    })
    it('should instantiate from string', () => {
        const rgba = Color.FromString('rgba(1, 2, 3, 0.1)')
        expect(rgba.Red).equal(1)
        expect(rgba.Green).equal(2)
        expect(rgba.Blue).equal(3)
        expect(rgba.Alpha).equal(0.1)
    })
    it('should throw an error if cannot instantiate from string', () => {
        expect(() => Color.FromString('')).to.throw()
        expect(() => Color.FromString('?')).to.throw()
        expect(() => Color.FromString('rgba()')).to.throw()
        expect(() => Color.FromString('rgba(1)')).to.throw()
        expect(() => Color.FromString('rgba(1,2)')).to.throw()
        expect(() => Color.FromString('rgba(1,2,3)')).to.throw()
    })
})
