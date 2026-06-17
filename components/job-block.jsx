const JobBlock = ({duration, title, corporation, jd}) => {
    return (
    <div className="pl-5">
        <h3 className="text-muted-foreground">
            {duration[0]} - {duration[1]}
        </h3>
        <h3 className="font-bold text-lg pt-1 text-foreground">
            {title}
        </h3>
        <h4 className="text-sm text-muted-foreground">
            {corporation}
        </h4>
        <p className="pt-3 text-sm whitespace-pre-line">
            {jd}
        </p>
    </div>
    );
}
 
export default JobBlock;