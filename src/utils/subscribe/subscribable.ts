export default interface Subscribable<T>{
	subscribe(callback: (item: T) => void, key?: string): void
}