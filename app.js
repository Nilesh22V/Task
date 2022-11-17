const express = require('express')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 3002
const contactId = process.env.CONTACTID
const TOKEN = process.env.TOKEN
app.use(express.json())

app.post('/', async (req, res) => {
    try {
        /**
         * Fetching Cutomer
         */
    
        var config = {
            method: 'get',
            url: `https://rest.gohighlevel.com/v1/contacts/${contactId}`,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        };
        console.log('data1')
        const getData = await axios(config)
        if (!getData) return res.status(400).json({ error: true, message: 'Contact Data not Found' })
               

        /**
         * Fetching custom field
         */

        var config = {
            method: 'get',
            url: 'https://rest.gohighlevel.com/v1/custom-fields/',
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        };

        const getCustomFiledData = await axios(config)
        if (!getCustomFiledData) return res.status(400).json({ error: true, message: 'Custom field not Found' })
        const getCustomFiledId = getCustomFiledData.data.customFields.filter((value, index) => value.name == 'DFS Booking Zoom Link')[0].id
        const custommFiled ={
            key : getCustomFiledId
        };
        

        /**
         * Updating contact
         */

        const phone = getData.data.contact.phone
        const data = {
            phone: phone,  //for validation
            customField: {
                id: [custommFiled.key],
                value:'TEST'
            }
        };

        var config = {
            method: 'put',
            url: `https://rest.gohighlevel.com/v1/contacts/${contactId}`,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            data: data
        };

        const updateCustomer = await axios(config)
        if (!updateCustomer) return res.status(400).json({ error: true, message: 'Not Updated' })
        return res.status(200).json({error: false, data: updateCustomer.data})

    } catch (error) {
        res.status(500).json({error: true,  message: 'Internal Server Error'})

    }

})

app.listen(port, () => {
    console.log('Server started');
})