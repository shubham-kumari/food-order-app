export default function Error({title, meaasage }){
    return(
        <div className="error">
            <h2>{title}</h2>
            <p>{meaasage}</p>
        </div>
    );
}