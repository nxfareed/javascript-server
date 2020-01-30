export default (req, res, next) => {
    next({ error: 'not found', code: '404'})
    }