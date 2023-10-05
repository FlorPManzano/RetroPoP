import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ValidateUserPage.css';

export default function ValidateUserPage() {
    const params = useParams().regCode;
    console.log(params);
    return <div>ValidateUserPage</div>;
}
