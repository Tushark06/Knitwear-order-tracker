function daysBetween(a, b) {
    const d1 = new Date(a); d1.setHours(0, 0, 0, 0);
    const d2 = new Date(b); d2.setHours(0, 0, 0, 0);
    return Math.round((d2 - d1)) / 86400000;
}

function calculateRunRate(order, events) {
    const done = events.length ? events[events.length - 1].quantityDone : 0;
    const remainingQuantity = Math.max(0, order.totalQuantity - done);
    const daysLeft = Math.max(0, daysBetween(new Date(), order.exFactoryDate));
    const overdue = daysBetween(new Date(), order.exFactoryDate) < 0;
    const requiredPerDay = daysLeft > 0 ? Math.ceil(remainingQuantity / daysLeft) : remainingQuantity;

    let actualPerDay = 0;
    if (events.length === 1) {
        const days = Math.max(1, daysBetween(order.createdAt, events[0].createdAt));
        actualPerDay = Math.round(done / days);
    } else if (events.length >= 2) {
        const first = events[0];
        const last = events[events.length - 1];
        const days = Math.max(1, daysBetween(first.createdAt, last.createdAt));
        actualPerDay = Math.round((last.quantityDone - first.quantityDone) / days);
    }

    let status;
    if (remainingQuantity === 0) {
        status = 'Green';
    } else if (overdue) {
        status = 'Red';
    } else if (events.length === 0) {
        status = 'Amber';
    } else if (actualPerDay >= requiredPerDay) {
        status = 'Green';
    } else if (actualPerDay >= requiredPerDay * 0.7) {
        status = 'Amber';
    } else {
        status = 'Red';
    }
    

    return { done, remainingQuantity, daysLeft, requiredPerDay, actualPerDay, status };

} 

module.exports = { calculateRunRate };