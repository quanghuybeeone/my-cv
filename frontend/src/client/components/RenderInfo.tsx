import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModalUpdateComponent from './ModalUpdateComponent'

interface Info {
    id: number,
    fullName: string,
    position: string,
    experience: string,
    email: string,
    website: string,
    phone: string
}

const RenderInfo: React.FC = () => {
    const [infos, setInfos] = useState<Info>(Object)
    const getInfo = async () => {
        const res = await axios.get("http://localhost:3000/api/infos/1")
        // console.log(res.data);
        setInfos(res.data)
    }
    useEffect(() => {

        getInfo();
    }, [])
    // console.log();

    return (
        <>
            <div className="col-lg-9 px-xl-10">
                <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                    <h3 className="h2 text-secondary mb-0">{infos.fullName}</h3>
                    <span className="text-primary">Web programming intern</span>
                    <div className='text-end'>
                        <ModalUpdateComponent titleModal={'Update Info'} inputFields={['fullName', 'position', 'experience', 'email', 'website', 'phone']} url="http://localhost:3000/api/infos/" targetId={1} onUpdate={getInfo} />
                    </div>
                </div>

                <ul className="list-unstyled mb-1-9">
                    <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                            Position:
                        </span>{" "}
                        {infos.position}
                    </li>
                    <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                            Experience:
                        </span>{" "}
                        {infos.experience}
                    </li>
                    <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                            Email:
                        </span>{" "}
                        {infos.email}
                    </li>
                    <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                            Website:
                        </span>{" "}
                        {infos.website}
                    </li>
                    <li className="display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                            Phone:
                        </span>{" "}
                        {infos.phone}
                    </li>
                </ul>
                <ul className="social-icon-style1 list-unstyled mb-0 ps-0 d-flex">
                    <li className='m-2'>
                        <a href="#!" className='text-dark fs-3'>
                            <i className="fab fa-twitter-square"></i>
                        </a>
                    </li>
                    <li className='m-2'>
                        <a href="#!" className='text-dark fs-3'>
                            <i className="fab fa-facebook-square"></i>
                        </a>
                    </li>
                    <li className='m-2'>
                        <a href="#!" className='text-dark fs-3'>
                        <i className="fab fa-pinterest-square"></i>
                        </a>
                    </li>
                    <li className='m-2'>
                        <a href="#!" className='text-dark fs-3'>
                        <i className="fab fa-instagram-square"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </>

    )
}

export default RenderInfo