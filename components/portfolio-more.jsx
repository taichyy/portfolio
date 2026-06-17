"use client"

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRightSquare, X } from "lucide-react";
 
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button"

const PortfolioMore = ({data}) => {

    const [num, setNum] = useState(0)
    const [imgOpacity, setImgOpacity] = useState('opacity-100')

    const handleClick = (status) => {
        if( status == true){
            if(num != data.img.length-1){
                setNum( prev => prev+1 )
                setImgOpacity('opacity-0')
                setTimeout(()=>{
                    setImgOpacity('opacity-100')
                },300)
            }
        }else {
            if(num != 0) {
                setNum( prev => prev-1 )
                setImgOpacity('opacity-0')
                setTimeout(()=>{
                    setImgOpacity('opacity-100')
                },300)
            }
        }
    }

    return ( 
    <Dialog>
        <DialogTrigger>
            <div className="cursor-pointer border-2 border-primary mt-10 py-1 px-5 hover:bg-primary duration-200 hover:text-primary-foreground">
                了解更多
            </div>
        </DialogTrigger>
        <DialogContent className="flex flex-col-reverse md:flex-row">
            <div className="mt-5 flex-1">
                <DialogHeader>
                    <DialogTitle className="text-left text-xl">
                        {data.title}
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        {data.subtitle.split('^t').map( (line, index) => (
                            <div key={line}>
                                {line}
                            </div>
                        ))}
                        <br/>
                        開發語言：{data.language}
                    </DialogDescription>
                </DialogHeader>
                <Separator className="my-2"/>
                <div>
                    {data.body.split('^t').map( (line, index) => (
                        <div key={index}>
                            {line}
                        </div>
                    ))}
                </div>
                <DialogFooter className="sm:justify-start mt-3">
                    <DialogClose asChild>
                        {data.link != "" ? (
                            <a href={data.link} target="_blank">
                                <Button type="button" variant="secondary" className="flex text-primary-foreground w-fit px-6 bg-primary rounded-none hover:bg-primary/80 border-0">
                                    <ArrowUpRightSquare width={18} className="mr-1 mt-1"/>
                                    參觀作品
                                </Button>
                            </a>
                        ) : (
                            <Button type="button" variant="secondary" className="flex text-primary-foreground w-fit px-6 bg-primary rounded-none hover:bg-primary/80 border-0">
                                <X width={18} className="mr-1"/>
                                本項目暫無連結
                            </Button>
                        )}
                    </DialogClose>
                </DialogFooter>
            </div>
            <div className="mt-5 md:mx-3">
                <Image
                    src={data.img[num]}
                    alt={`${data.img[num].split('/')[data.img[num].split('/').length-1]} Image`}
                    width={500}
                    height={500}
                    className={`aspect-video h-auto hover:opacity-95 duration-300 mx-auto ${imgOpacity}`}
                />
                <div className="flex justify-between mt-1">
                    <ArrowLeft className={`cursor-pointer duration-100 ${num == 0 && 'opacity-0 cursor-default'}`} size={30} onClick={()=>handleClick(false)}/>
                    <ArrowRight className={`cursor-pointer duration-100 ${num == data.img.length-1 && 'opacity-0 cursor-default'}`} size={30} onClick={()=>handleClick(true)}/>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    );
}
 
export default PortfolioMore;