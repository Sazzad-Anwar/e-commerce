
//Description: Send the organized readable time string
exports.localTimeString = (time) => {
    return new Date(time).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};