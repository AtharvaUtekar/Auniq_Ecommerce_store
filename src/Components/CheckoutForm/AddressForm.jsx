import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'

import {commerce} from '../../lib/Commerce'

const AddressForm = ({checkoutToken}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubDivisions, setshippingSubDivisions] = useState([]);
    const [shippingSubDivision, setshippingSubDivision] = useState('');
    const [shippingOptions, setshippingOptions] = useState([]);
    const [shippingOption, setshippingOption] = useState('');
    
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    
    console.log(countries); 
    const fetchShippingCountries = async( checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        
        setShippingCountries( countries ); 
        setShippingCountry(Object.keys(countries)[0]);
    }
    
    const fetchSubdivisions = async( countryCode ) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        
        setshippingSubDivisions( subdivisions ); 
        setshippingSubDivision(Object.keys( subdivisions )[0]);
    }

    useEffect(()=>{
        if(shippingCountry)  fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);
     
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id);
    }, []);


    return (
        <>
            <Typography variant="h6" gutterbottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>    
                        <FormInput required name='firstName' label="First Name"/>   
                        <FormInput required name='lastName' label="Last Name"/> 
                        <FormInput required name='address1' label="Address line 1"/> 
                        <FormInput required name='email' label="Email Id"/> 
                        <FormInput required name='city' label="City"/> 
                        <FormInput required name='zip' label="Pin Code"/>     
                        
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                     {item.label}
                                </MenuItem>
                             ))}
                            </Select>
                        </Grid>
                         
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubDivision} fullWidth onChange={(e) => setshippingSubDivision(e.target.value)}>
                            {Object.entries(shippingSubDivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/* 
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={ } value={}>
                                    Select Options
                                </MenuItem>
                            </Select>
                        </Grid> 
                        */} 
                           
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
