<template>
    <div class="event-item" :class="cssClasses"
       @click="$emit('click', event, $event)">
        <div class="provider">
            <p class="adultPrice" v-if="event.adultPrice >= 0">成人：<i class="fa fa-rmb"></i> {{ event.adultPrice }}</p>
            <p class="childPrice" v-if="event.childPrice >= 0">儿童：<i class="fa fa-rmb"></i> {{ event.childPrice }}</p>
            <p class="singlePrice" v-if="event.singlePrice >= 0">单人差：<i class="fa fa-rmb"></i> {{ event.singlePrice }}</p>
        </div>
        <p class="stock" v-if="event.storageNum >= 0">库存：{{ event.storageNum }}</p>
        <div class="admin">
            <p v-if="event.price1 >= 0">成人一：<i class="fa fa-rmb"></i> {{ event.price1 }}</p>
            <p v-if="event.price2 >= 0">成人二：<i class="fa fa-rmb"></i> {{ event.price2 }}</p>
            <p v-if="event.price3 >= 0">成人三：<i class="fa fa-rmb"></i> {{ event.price3 }}</p>
            <p v-if="event.price4 >= 0">成人四：<i class="fa fa-rmb"></i> {{ event.price4 }}</p>
            <p v-if="event.price5 >= 0">成人五：<i class="fa fa-rmb"></i> {{ event.price5 }}</p>
            <p v-if="event.priceChild >= 0">儿童：<i class="fa fa-rmb"></i> {{ event.priceChild }}</p>
            <p v-if="event.priceSingle >= 0">单人差：<i class="fa fa-rmb"></i> {{ event.priceSingle }}</p>
        </div>
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

                if (!this.event.isShow) {
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
    .event-item  p {
        margin: 5px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .stock {
        color: #09f;
    }
    .event-item .provider p {
        color: #1eb974;
    }
    .event-item .admin p {
        color: #f60;
    }

</style>