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
    } else if (input instanceof Request) {
        if (init != undefined && init.headers != undefined) {
            const newHeaders = new Headers(init.headers)
            newHeaders.set("X-CSRFToken", csrf_cookie)
            init.headers = newHeaders
        } else {
            input.headers.set("X-CSRFToken", csrf_cookie)
        }
    } else {
        const newHeaders = new Headers(init?.headers)
        newHeaders.set("X-CSRFToken", csrf_cookie)
        if (init == undefined) {
            init = { headers: newHeaders }
        } else {
            init.headers = newHeaders
        }
    }
    return await orgin_fetch(input, init)
}

export default {}