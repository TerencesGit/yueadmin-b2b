<template>
    <div class="event-item" :class="cssClasses"
       @click="$emit('click', event, $event)">
        <p class="adultPrice" v-if="event.adultPrice">成人价格：<i class="fa fa-rmb"></i>{{ event.adultPrice }}</p>
        <p class="childPrice" v-if="event.childPrice">儿童价格：<i class="fa fa-rmb"></i>{{ event.childPrice }}</p>
        <p class="singlePrice" v-if="event.singlePrice">单人数补差：<i class="fa fa-rmb"></i>{{ event.singlePrice }}</p>
        <p class="stock >= 0" v-if="event.storageNum">库存：{{ event.storageNum }}</p>
        <p v-if="event.price1">一级价格：<i class="fa fa-rmb"></i>{{ event.price1 }}</p>
        <p v-if="event.price2">二级价格：<i class="fa fa-rmb"></i>{{ event.price2 }}</p>
        <p v-if="event.price3">三级价格：<i class="fa fa-rmb"></i>{{ event.price3 }}</p>
        <p v-if="event.price4">四级价格：<i class="fa fa-rmb"></i>{{ event.price4 }}</p>
        <p v-if="event.price5">五级价格：<i class="fa fa-rmb"></i>{{ event.price5 }}</p>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        props: ['event', 'date', 'firstDay'],
        computed: {
            cssClasses () {
                let cssClasses = this.event.cssClass;

                if (!Array.isArray(cssClasses)) {
                    cssClasses = [cssClasses];
                } else {
                    cssClasses = Array.from(cssClasses);
                }

                if (this.start.isSame(this.date, 'day')) {
                    cssClasses.push('is-start');
                }

                if (this.end.isSame(this.date, 'day')) {
                    cssClasses.push('is-end');
                }

                if (! this.event.isShow) {
                    cssClasses.push('is-opacity');
                }

                return cssClasses.join(' ');
            },
            showTitle() {
                return (this.date.day() == this.firstDay || this.start.isSame(this.date, 'day'));
            },
            start () {
                return moment(this.event.start);
            },
            end () {
                return moment(this.event.end);
            }
        }
    }
</script>
<style scoped>
    .event-item > p {
        margin: 5px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>