import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModalUpdateComponent from './ModalUpdateComponent'
import ModalDeleteComponent from './ModalDeleteComponent'
import ModalAddComponent from './ModalAddComponent'

interface Infomation {
    id: number,
    content: string
}

const ListInfomation: React.FC = () => {
    const [infomations, setInfomations] = useState<Infomation[]>([])
    const getInfomations = async () => {
        const res = await axios.get("http://localhost:3000/api/infomations")

        setInfomations(res.data)
    }
    useEffect(() => {
        getInfomations();

    }, [])

    return (
        <>
            <div className="col-lg-12 mb-4 mb-sm-5">
                <span className="section-title text-primary mb-3 mb-sm-4"   >
                    More Infomation
                    <ModalAddComponent titleModal={'Add new More Infomation'} inputFields={['content']} url="http://localhost:3000/api/infomations/" onUpdate={getInfomations} />
                </span>
                {infomations.map((infomation) => {
                    return (
                        <div className='row mb-3' key={infomation.id}>
                            <div className='col-lg-10 mb-2 mb-lg-0'>{infomation.content}</div>
                            <div className='col-lg-2 mb-2 mb-lg-0 d-flex justify-content-end'>
                                <div>
                                    <ModalUpdateComponent titleModal={'Update More Infomation'} inputFields={['content']} url="http://localhost:3000/api/infomations/" targetId={infomation.id} onUpdate={getInfomations} />
                                    <ModalDeleteComponent titleModal={'Delete More Infomation'} url="http://localhost:3000/api/infomations/" targetId={infomation.id} onUpdate={getInfomations} />
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>

        </>

    )
}

export default ListInfomation