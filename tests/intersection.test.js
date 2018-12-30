import Intersection from '../src/Intersection'

describe('intersection test', () => {
    test('has intersection test1', () => {
        let line1 = [[0, 9], [1, 0]]
        let line2 = [[0, 5], [1, 4]]

        let i = Intersection._hasIntersection(line1, line2)
        expect(i).toBeTruthy()
    })

    test('has intersection test2', () => {
        let line1 = [[0, 9], [1, 0]]
        let line2 = [[0, 5], [1, -4]]

        let i = Intersection._hasIntersection(line1, line2)
        expect(i).toBeFalsy()
    })

    test('has intersection test3', () => {
        let line1 = [[0, 9], [1, 0]]
        let line2 = [[0, 15], [1, 6]]

        let i = Intersection._hasIntersection(line1, line2)
        expect(i).toBeFalsy()
    })

    test('has intersection test4', () => {
        let line1 = [[0, 9], [1, 0]]
        let line2 = [[0, 9], [1, 6]]

        let i = Intersection._hasIntersection(line1, line2)
        expect(i).toBeTruthy()
    })

    test('has intersection test5', () => {
        let line1 = [[0, 9], [1, 0]]
        let line2 = [[0, 19], [1, 0]]

        let i = Intersection._hasIntersection(line1, line2)
        expect(i).toBeTruthy()
    })

    test('has intersection test6', () => {
        let line1 = [[0, 9], [1, 0]]
        let line2 = [[0, 9], [1, 0]]

        let i = Intersection._hasIntersection(line1, line2)
        expect(i).toBeTruthy()
    })

    test('get intersection test1', () => {
        let line1 = [[0, 9], [1, 0]]
        let line2 = [[0, 5], [1, 4]]

        let i = Intersection._getIntersection(line1, line2)
        let eq = areVerticesEqual(i, [0.5, 4.5])
        expect(eq).toBeTruthy()
    })

    test('get intersection test2', () => {
        let line1 = [[0, 9], [1, 0]]
        let line2 = [[0, 5], [1, -4]]

        let i = Intersection._getIntersection(line1, line2)
        expect(i).toBeNull()
    })

    test('get intersection test3', () => {
        let line1 = [[0, 9], [4, 0]]
        let line2 = [[0, 5], [4, 4]]

        let i = Intersection._getIntersection(line1, line2)
        let eq = areVerticesEqual(i, [2, 4.5])
        expect(eq).toBeTruthy()
    })

    test('get intersection test4', () => {
        let line1 = [[2, 9], [4, 0]]
        let line2 = [[2, 5], [4, 4]]

        let i = Intersection._getIntersection(line1, line2)
        let eq = areVerticesEqual(i, [3, 4.5])
        expect(eq).toBeTruthy()
    })

    test('get out of bounds line test1', () => {
        let targetLine = [[0, 4], [1, 0], [2, 4], [3, 3], [4, 4], [5, 0]]
        let baseLine = [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]]
        let result = Intersection.splitLine(targetLine, baseLine, 'up')
        let expected = [[0, 4], [0.5, 2], null, [1.5, 2], [2, 4], [3, 3], [4, 4], [4.5, 2], null]

        let eq = areLinesEqual(result, expected)
        expect(eq).toBeTruthy()
    })

    test('get out of bounds line test2', () => {
        let targetLine = [[0, 4], [1, 0], [2, 4], [3, 3], [4, 4], [5, 0]]
        let baseLine = [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]]
        let result = Intersection.splitLine(targetLine, baseLine, 'down')
        let expected = [null, [0.5, 2], [1, 0], [1.5, 2], null, null, null, [4.5, 2], [5, 0]]

        let eq = areLinesEqual(result, expected)
        expect(eq).toBeTruthy()
    })
})

function areVerticesEqual(v1, v2, tolerance = 1e-6) {
    if (v1 === null && v2 === null) {
        return true
    }

    return Math.abs(v1[0] - v2[0]) < tolerance && Math.abs(v1[1] - v2[1]) < tolerance
}

function areLinesEqual(l1, l2, tolerance = 1e-6) {
    if (l1.length != l2.length) {
        return false
    }

    for (let i = 0; i < l1.length; i++) {
        if (!areVerticesEqual(l1[i], l2[i], tolerance)) {
            return false
        }
    }

    return true
}