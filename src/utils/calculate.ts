import main from "@src/pages/Main";
import { derivative, parse } from 'mathjs';

export interface ICalculateProps {
    rowIndex: number;
    P: number[];
    variant: string;
    allVariants: string[];
    failureRates: number[];
    recoveryRates: number[];
    allNumbers: number[];
}

export interface ICreateChartDataProps {
    endTime: number;
    count: number;
    failureRates: number[];
    recoveryRates: number[];
}

export interface IConvertProps {
    min: number;
    max: number;
    x: number;
}

const createVariants = (num: string, otherNums: string[]) => {
    return otherNums.map((it) => {
        const newNum = num + it;
        const sortedNum = newNum.split('').sort().join('');

        if (!it.includes(num) && !otherNums.includes(sortedNum)) {
            return sortedNum;
        }
    }).filter(Boolean) as string[];
}

const createAllVariants = (count: number) => {
    const numStr = Array(count).fill(1).map(((it, i) => String(it + i)));
    let end = false;
    let i = 0;
    let res = [...numStr];

    while (!end) {
        const num = res[i];
        res = [...res, ...createVariants(num, res)]
        end = res.some(it => it.length === numStr.length);
        i++;
    }

    return res;
}

const createP = (count: number) => {
    const P = Array(Math.pow(2, count)).fill(0);
    P[0] = 1;
    return P;
}

const activationFunc = ({ min, max, x }: IConvertProps) => {
    const oldRange = max - min;
    const newMax = 1;
    const newMin = 0;
    const newRange = newMax - newMin;
    return (x - min) / oldRange * newRange + newMin;
}

const calculateFirstArg = ({
    P,
    variant,
    allVariants,
    failureRates,
}: ICalculateProps) => {
    const variantNums = variant.split('').map(Number).reverse();
    const sourceVariants: string[] = variant.length === 1 && variant !== '0' ? ['0'] : allVariants.filter(it => variant.length - 1 === it.length).filter(it => {
        return it.split('').every(s => variant.includes(s))
    });

    const sourceIndexes = sourceVariants.map(it => allVariants.indexOf(it));
    let log = '';
    const res = sourceIndexes.reduce((total, it, i) => {
        log += `P${it} * l${variantNums[i]} +`
        return total + P[it] * failureRates[variantNums[i] - 1];
    }, 0)

    // console.log(log)

    return res;
}

const calculateSecondArg = ({
    failureRates,
    recoveryRates,
    variant,
    allNumbers,
    P,
    rowIndex,
}: ICalculateProps) => {
    const variantNums = variant.split('').map(Number);
    const otherVariants = allNumbers.filter(it => !variantNums.includes(it));
    let log = '-(';
    const res = -1 * (variantNums.reduce((total, num) => {
        log += `u${num}(${recoveryRates[num - 1] || 0}) + `;
        return total + (recoveryRates[num - 1] || 0)
    }, 0) + otherVariants.reduce((total, num, i) => {
        log += `l${num}`;
        if (i === otherVariants.length - 1) {
            log += `)`
        } else {
            log += ' + '
        }
        return total + failureRates[num - 1]
    }, 0)) * P[rowIndex];

    log += ` * P${rowIndex}`

    // console.log(log);
    return res;
}

const calculateThirdArg = ({
   P,
   variant,
   allVariants,
   recoveryRates,
    allNumbers,
}: ICalculateProps) => {
    const variantNums = variant.split('').map(Number);
    const otherVariants = allNumbers.filter(it => !variantNums.includes(it));
    const derivativeVariants: string[] = variant.length === 1 && variant === '0' ? allNumbers.map(String) : allVariants.filter(it => variant.length + 1 === it.length).filter(it => {
        return variant.split('').every(s => it.includes(s))
    });
    const derivativeIndexes = derivativeVariants.map(it => allVariants.indexOf(it));
    let log = '';
    const res = derivativeIndexes.reduce((total, it, i) => {
        log += `P${it} * u${otherVariants[i]} +`
        return total + P[it] * recoveryRates[otherVariants[i] - 1];
    }, 0);

    // console.log(log);

    return derivativeIndexes.reduce((total, it, i) => {
        return total + P[it] * recoveryRates[otherVariants[i] - 1];
    }, 0);
}

const calculateRow = (props: ICalculateProps) => {
    const firstArg = calculateFirstArg(props);
    const secondArg = calculateSecondArg(props);
    const thirdArg = calculateThirdArg(props);

    return firstArg + secondArg + thirdArg;
}

export const createChartData = ({ recoveryRates, failureRates, endTime, count }: ICreateChartDataProps) => {

    const allVariants = ['0', ...createAllVariants(count)];
    const allNumbers = Array(count).fill(1).map(((it, i) => it + i));
    let P = createP(count);
    const res = [{
        time: 0,
        ...P.reduce((total, it, i) => {
            return { ...total, [i]: it };
        }, {})
    }];

    let max = 1;
    let min = 0;
    const dt = 0.01;


    for (let t = 0; t <= endTime; t += dt) {
        // console.log(P)
        const results = allVariants.map((variant, rowIndex) => {
            // console.log('---------------------------------')
            // console.log('Variant:', variant)
            const res = calculateRow({
                P: P,
                allNumbers,
                allVariants,
                variant,
                recoveryRates,
                rowIndex,
                failureRates,
            });
            return res;
        });

        max = Math.max(max, ...results);
        min = Math.min(min, ...results);

        // const convertedRes = results.map(it => activationFunc({ min, max, x: it * dt }))
        let convertedRes = results.map((it, i) => P[i] + it * dt);
        const convertedResSum = convertedRes.reduce((a, b) => a + b, 0);
        convertedRes = convertedRes.map(it => it / convertedResSum);

        res.push({
            time: t,
            ...convertedRes.reduce((total, it, i) => {
                return { ...total, [i]: it };
            }, {})
        });

        P = [...convertedRes];
    }

    return res;
}
