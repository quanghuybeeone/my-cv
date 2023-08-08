import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModalAddComponent from './ModalAddComponent'
import ModalUpdateComponent from './ModalUpdateComponent'
import ModalDeleteComponent from './ModalDeleteComponent'

interface Target {
    id: number,
    content: string
}

const ListTarget: React.FC = () => {
    const [targets, setTargets] = useState<Target[]>([])
    const getTargets = async () => {
        const res = await axios.get("http://localhost:3000/api/targets")
        setTargets(res.data)
    }
    useEffect(() => {
        getTargets();
    }, [])

    return (
        <>
            <div className="col-lg-12 mb-4 mb-sm-5">
                <span className="section-title text-primary mb-3 mb-sm-4"   >
                    Target
                    <ModalAddComponent titleModal={'Add new Target'} inputFields={['content']} url="http://localhost:3000/api/targets/" onUpdate={getTargets} />
                </span>
                {targets.map((target) => {
                    return (
                        <div className='row mb-3' key={target.id}>
                            <div className='col-lg-10 mb-2 mb-lg-0'>{target.content}</div>
                            <div className='col-lg-2 mb-2 mb-lg-0 d-flex justify-content-end'>
                                <div>
                                    <ModalUpdateComponent titleModal={'Update Target'} inputFields={['content']} url="http://localhost:3000/api/targets/" targetId={target.id} onUpdate={getTargets} />
                                    <ModalDeleteComponent titleModal={'Delete Target'} url="http://localhost:3000/api/targets/" targetId={target.id} onUpdate={getTargets} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ListTarget