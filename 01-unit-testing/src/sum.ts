// add a and b together and return sum 🤯
export const add = (...numbers: number[]) => {
	return numbers.reduce((acc, num) => acc + num, 0)
}

// subtract numbers from each other and return sum
export const sub = (initialValue: number, ...numbers: number[]) => {
	return numbers.reduce((acc, num) => acc - num, initialValue)
}