import FullCalendar from './fullCalendar'

FullCalendar.install = function (Vue) {
	Vue.component(FullCalendar.name, FullCalendar)
}

export default FullCalendar