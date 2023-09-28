function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const { fetch: orgin_fetch } = window 
window.fetch = async (input, init) => {
    const csrf_cookie = getCookie('csrftoken')
    if (csrf_cookie == null || csrf_cookie == undefined) {
        return await orgin_fetch(input, init)
    } else if (init == undefined) {
        init = { headers: {"X-CSRFToken": csrf_cookie}}
    } else if (init.headers == undefined) {
        init.headers = {"X-CSRFToken": csrf_cookie}
    } else {
        if (init.headers instanceof Headers) {
            init.headers.append("X-CSRFToken", csrf_cookie)
        } else if (init.headers instanceof Array) {
            const target = init.headers.find(value => value[0].toUpperCase() === "X-CSRFToken")
            if (target) {
                target[1] = csrf_cookie
            } else {
                init.headers.push(["X-CSRFToken", csrf_cookie])
            }
        } else {
            Object.assign(init.headers, {"X-CSRFToken": csrf_cookie})
        }
    }
    return await orgin_fetch(input, init)
}

export default {}