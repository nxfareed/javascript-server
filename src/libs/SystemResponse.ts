class SystemResponse {
    static success = (res, data, message = 'success') => {
        return res.status(200).send({
            static: 'ok',
            message,
            data
        });
    }
    static error = (res, data, message = 'error occured'): any => {
        return res.status(500).send({
            status: 'not ok',
            message,
            data

        });
      }
}
export default SystemResponse;
