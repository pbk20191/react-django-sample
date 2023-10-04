import React, { useEffect } from "react"
import { IndexRouteObject, useLoaderData, useRevalidator } from "react-router-dom"
import { QuestionResponse } from "../../types/question"
import { Text, Card, Dialog, DialogTitle, DialogBody, DialogTrigger, Button, DialogContent, DialogSurface, DialogActions, Toast, ToastTitle, useId } from "@fluentui/react-components"
import RouteLink from "../../components/RouteLink"
import {Delete24Regular, Add24Regular } from "@fluentui/react-icons"
import { useToastCenter } from "../../components/toastCenter"


const QuestionView: React.FC = () => {
    const revalidator = useRevalidator()
    const questionList = useLoaderData() as QuestionResponse
    const toastCenter = useToastCenter()
    const toastId = useId("QustionList")
    useEffect(() => {
        return () => {
            toastCenter.dismissToast(toastId)
        }
    }, [toastId, toastCenter])

    return (
    <div>
        <nav style={{ display: "flex", flexDirection:"row-reverse"}}>
            <RouteLink to="create">
                <Add24Regular/>
            </RouteLink>
        </nav>
        {
            questionList.results.length > 0 ?
                questionList.results.map(item => {
                    return <Card key={item.id} orientation="horizontal">
                        <div style={{ display: "flex", flexDirection: "column"}}>
                        <Text>{item.subject}</Text>
                        <Text>{item.content}</Text>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row-reverse"}}>
                            <Dialog>
                                <DialogTrigger>
                                    <Button size="small" style={{ width: "fit-content" }}><Delete24Regular/></Button>
                                </DialogTrigger>
                                <DialogSurface>
                                    <DialogBody>
                                        <DialogTitle>질문 삭제</DialogTitle>
                                        <DialogContent> 선택한 질문을 삭제하시겠습니까?</DialogContent>
                                        <DialogActions>
                                            <DialogTrigger disableButtonEnhancement>
                                                <Button appearance="secondary">Close</Button>
                                            </DialogTrigger>
                                            <Button appearance="primary" onClick={() => {
                                                fetch("/api/question/" + item.id, { method: "delete"} )
                                                .then(response => {
                                                if(response.status === 204) {
                                                    revalidator.revalidate()
                                                } else {
                                                    toastCenter.dispatchToast(
                                                        <Toast>
                                                            <ToastTitle>{response.statusText}</ToastTitle>
                                                        </Toast>,
                                                        {
                                                            intent: "error"
                                                        }
                                                    )
                                                }
                                                })
                                            }}>확인</Button>
                                        </DialogActions>
                                    </DialogBody>

                                </DialogSurface>
                            </Dialog>
                        </div>
                    </Card>
                })
                :
                <Text>
                    No Question to show <br/>
                    please add a question
                </Text>
        }
    </div>
    )
}

const route: IndexRouteObject = {
    index: true,
    loader: async () => {
        return fetch("/api/question", { method: "GET" }).then(response => response.json())
    },
    element: <QuestionView/>

}

export default route