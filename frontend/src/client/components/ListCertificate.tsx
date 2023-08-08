import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModalUpdateComponent from './ModalUpdateComponent'
import ModalAddComponent from './ModalAddComponent'
import ModalDeleteComponent from './ModalDeleteComponent'

interface Certificate {
    id: number,
    time: string,
    name: string,
}

const ListCertificate: React.FC = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const getCertificates = async () => {
        const res = await axios.get("http://localhost:3000/api/certificates")
        setCertificates(res.data)
    }
    useEffect(() => {
        getCertificates();
    }, [])

    return (
        <>
        <div className="col-lg-12 mb-4 mb-sm-5">
                <span className="section-title text-primary mb-3 mb-sm-4"   >
                    Certificate
                    <ModalAddComponent titleModal={'Add new Certificate'} inputFields={['time','name']} url="http://localhost:3000/api/certificates/" onUpdate={getCertificates} />
                </span>
            {certificates.map((certificate) => {
                return (
                    <div className="row" key={certificate.id}>
                        <div className='col-lg-3 mb-4 mb-lg-0'>
                            <b>{certificate.time}</b>
                        </div>
                        <div className='col-lg-7 mb-4 mb-lg-0'>
                            <p>{certificate.name}</p>
                        </div>
                        <div className='col-lg-2 mb-2 mb-lg-0 d-flex justify-content-end'>
                                <div>
                                    <ModalUpdateComponent titleModal={'Update Certificate'} inputFields={['time','name']} url="http://localhost:3000/api/certificates/" targetId={certificate.id} onUpdate={getCertificates} />
                                    <ModalDeleteComponent titleModal={'Delete Certificate'} url="http://localhost:3000/api/certificates/" targetId={certificate.id} onUpdate={getCertificates} />
                                </div>
                            </div>
                    </div>
                )
            })}
            </div>
            
        </>

    )
}

export default ListCertificate