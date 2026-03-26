import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage(){
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome back..</CardTitle>
                <CardDescription>Login with your gmail account</CardDescription>
            </CardHeader>
        </Card>
    )
}