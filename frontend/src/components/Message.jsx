import { Alert } from 'react-bootstrap'
export default function Message({ variant='info', children }) {
    return (
        <>
            <Alert className='mb-0' variant={variant}>{children}</Alert>
        </>
    )
}
