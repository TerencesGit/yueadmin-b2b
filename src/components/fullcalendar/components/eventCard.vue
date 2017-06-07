<template>
    <div class="event-item" :class="cssClasses"
       @click="$emit('click', event, $event)">
        <p class="price" v-if="event.price">价格：￥{{ event.price }}</p>
        <p class="stock" v-if="event.stock">库存： {{ event.stock }}</p>
       <!--  <slot :event="event" v-if="showTitle">
            Default: {{ event }}
        </slot> -->
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
