import { Button, Field, Input, Textarea, Toast, ToastBody, ToastTitle, useId } from "@fluentui/react-components";
import { useEffect } from "react";
import { Form, NonIndexRouteObject, ActionFunction, redirect, useActionData } from "react-router-dom";
import { useToastCenter } from "../../components/toastCenter";


const QuestionCreateView: React.FC = () => {
    const toast_id = useId("question-create")
    const toastCenter = useToastCenter() 
    const actionData = useActionData() as {
        status: number,
        statusText: string,
        response: {
            subject: [] | undefined,
            content: [] | undefined
        }
    }
    useEffect(() => {
        console.log(actionData)
        if (actionData == undefined) {
            return
        }
        toastCenter.dispatchToast(
            <Toast>
                <ToastTitle>
                    {actionData.statusText}
                </ToastTitle>
                <ToastBody>
                    { actionData.response.subject && "subject: " + actionData.response.subject
                    }
                    { actionData.response.content && "content: " + actionData.response.content
                    }
                </ToastBody>
            </Toast>,
            {  
                toastId: toast_id,
                intent: "error"
            }
        )
        return () => {
            toastCenter.dismissToast(toast_id)
        }
    }, [actionData, toastCenter, toast_id])
    return (<>
        <Form method="post" encType="application/x-www-form-urlencoded">
            <Field label="질문 제목">
                <Input name="subject" />
                
            </Field>
            <Field label="질문 내용">
                <Textarea name="content" />
            </Field>
            
            <Field>
                <Button type="submit">Submit</Button>
            </Field>
        </Form>
    </>)
}

const actionFunction:ActionFunction = async ({params, request, context}) => {
    console.log(params, request, context)
    

    const blobPromise = request.clone().blob()
    Object.assign(request, { duplex: "half"})
    // duplex request with new URL
    const b = Object.assign(
        new Request("/api/question/", request), 
        { duplex: "half" }
    )
    
    // new Request with arbitary blob body (not stream)
    const response = await fetch(b, { body: await blobPromise})

    if (response.status === 201) {
        return redirect("../", 301)
    } else {

        return {
            statusText: response.statusText,
            status: response.status,
            response: await response.clone().json()
        }
    }
}

const route: NonIndexRouteObject = {
    path: "create",
    action: actionFunction,
    element: <QuestionCreateView/>
}

export default route;