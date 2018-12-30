module.exports = class Intersection {
    static splitLine(targetLine, baseLine, direction = 'up') {
        let data = Intersection.splitLineCore(targetLine, baseLine, direction)

        let result = []
        for (let i = 0; i < data.length; i++) {
            if (data[i] === null) continue
            else {
                let currentLine = []
                while (data[i] !== null) {
                    currentLine.push(data[i])
                    i++

                    if (i === data.length) {
                        break
                    }
                }

                result.push(currentLine)
            }
        }

        return result
    }

    static splitLineCore(targetLine, baseLine, direction = 'up') {
        let result = []

        if (targetLine.length != baseLine.length) {
            console.error('invalid line pairs')
            return result
        }

        for (let i = 0; i < targetLine.length; i++) {
            if (targetLine[i][0] != baseLine[i][0]) {
                console.error('invalid x value at position', i)
                return result
            }
        }

        if (Intersection._outOfBasePoint(targetLine[0], baseLine[0], direction)) {
            result.push(targetLine[0])
        } else {
            result.push(null)
        }

        for (let i = 1; i < targetLine.length; i++) {
            let targetSeg = [targetLine[i - 1], targetLine[i]]
            let baseSeg = [baseLine[i - 1], baseLine[i]]
            let r = Intersection._getIntersection(targetSeg, baseSeg)

            if (r !== null) {
                result.push(r)
            }

            if (Intersection._outOfBasePoint(targetSeg[1], baseSeg[1], direction)) {
                result.push(targetSeg[1])
            } else {
                result.push(null)
            }
        }

        return result
    }

    static _outOfBasePoint(targetPoint, basePoint, direction) {
        if (direction === 'up' && targetPoint[1] >= basePoint[1]) {
            return true
        } else if (direction === 'down' && targetPoint[1] <= basePoint[1]) {
            return true
        } else {
            return false
        }
    }

    static _hasIntersection(line1, line2) {
        let y11 = line1[0][1]
        let y12 = line1[1][1]
        let y21 = line2[0][1]
        let y22 = line2[1][1]
        
        return !(y11 > y21 && y12 > y22 || y11 < y21 && y12 < y22)
    }

    static _getLineInfo(line) {
        let [x1, y1] = line[0]
        let [x2, y2] = line[1]
        let y = y2 - y1
        let x = x2 - x1
        let angle = Math.atan2(y, x)
        let tgv = Math.tan(angle)
        let yOffset = y1 - tgv * x1
        return { tgv, yOffset }
    }

    static _getIntersection(line1, line2) {
        if (!Intersection._hasIntersection(line1, line2)) {
            return null
        }

        let info1 = Intersection._getLineInfo(line1)
        let info2 = Intersection._getLineInfo(line2)
        let x = (info2.yOffset - info1.yOffset) / (info1.tgv - info2.tgv)

        if (info1.tgv === info2.tgv) {
          return null
        } else {
          let y = x * info1.tgv + info1.yOffset
          let result = [x, y]

          if(Intersection._isOnLine(result, line1) && Intersection._isOnLine(result, line2)) {
              return result
          } else {
              return null
          }
        }
    }

    static _isOnLine(point, line) {
        let x1 = Math.min(line[0][0], line[1][0])
        let x2 = Math.max(line[0][0], line[1][0])
        let y1 = Math.min(line[0][1], line[1][1])
        let y2 = Math.max(line[0][1], line[1][1])

        return point[0] >= x1 && point[0] <= x2 && point[1] >= y1 && point[1] <= y2
    }
}