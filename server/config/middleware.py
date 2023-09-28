from asgiref.sync import iscoroutinefunction
from django.utils.decorators import sync_and_async_middleware
from django.http.request import HttpRequest
from django.http.response import HttpResponse

@sync_and_async_middleware
def MyMiddleWare(get_response):
    if iscoroutinefunction(get_response):
        async def middleware(request: HttpRequest):
            response: HttpResponse = await get_response(request)
            return response
    else:
        def middleware(request: HttpRequest):
            response: HttpResponse = get_response(request)
            return response
    return middleware
