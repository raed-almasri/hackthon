let getRegular = (type) => {
    let expressions = /%/;
    switch (type.toLowerCase().trim()) {
        case "phone":
            expressions = /^(!?(\+|00)963|0)?9\d{8}$/;
            break;
        case "password":
            expressions =
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$/;
            break;
        case "username":
            expressions = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
            break;
        case "address":
            expressions = /^[a-zA-Z0-9\s\-\,\#\.\u0600-\u06FF]+$/;
            break;
    }
    return expressions;
};
export { getRegular };
