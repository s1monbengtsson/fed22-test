import { describe, it, expect, beforeAll } from 'vitest'
import { clone } from '../utils/arrays'

describe('clones an array', () => {
    const a: Array<any> = ['i', 'like', 'unit', 'tests']
    let b: Array<any> = []

    beforeAll(() => {
        b = clone(a)
    })
    

    // test that cloned array contains the same number of elements
    it('contains the same number of items', () => {  
        expect(b.length).toBe(a.length)
    })

    // test that cloned array contains the same items
    it('contains the same items', () => {
        expect(b).toEqual(a)
    })

    // test that cloned array is *NOT* the same array as the original array
    it('is not the same array', () => {
        expect(b).not.toBe(a)
    })
})