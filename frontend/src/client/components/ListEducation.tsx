import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModalAddComponent from './ModalAddComponent'
import ModalUpdateComponent from './ModalUpdateComponent'
import ModalDeleteComponent from './ModalDeleteComponent'

interface Education {
    id: number,
    time: string,
    school: string,
}

const ListEducation: React.FC = () => {
    const [educations, setEducations] = useState<Education[]>([])
    const getEducations = async () => {
        const res = await axios.get("http://localhost:3000/api/educations")

        setEducations(res.data)
    }
    useEffect(() => {
       
        getEducations();

    }, [])

    return (
        <>
        <div className="col-lg-12 mb-4 mb-sm-5">
                <span className="section-title text-primary mb-3 mb-sm-4"   >
                    Education
                    <ModalAddComponent titleModal={'Add new Education'} inputFields={['time','school']} url="http://localhost:3000/api/educations/" onUpdate={getEducations} />
                </span>
            {educations.map((education) => {
                return (
                    <div className="row" key={education.id}>
                        <div className='col-lg-3 mb-4 mb-lg-0'>
                            <b>{education.time}</b>
                        </div>
                        <div className='col-lg-7 mb-4 mb-lg-0'>
                            <p>{education.school}</p>
                        </div>
                        <div className='col-lg-2 mb-2 mb-lg-0 d-flex justify-content-end'>
                                <div>
                                    <ModalUpdateComponent titleModal={'Update Education'} inputFields={['time','school']} url="http://localhost:3000/api/educations/" targetId={education.id} onUpdate={getEducations} />
                                    <ModalDeleteComponent titleModal={'Delete Education'} url="http://localhost:3000/api/educations/" targetId={education.id} onUpdate={getEducations} />
                                </div>
                            </div>
                    </div>
                )
            })}
            </div>
        </>

    )
}

export default ListEducation