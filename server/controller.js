const { getByAltText, findByAltText } = require("@testing-library/react");

module.exports = {
    getList: (req,res)=>{
        const db = req.app.get('db');
        db.get_data()
            .then(data=>{
                res.status(200).send(data);
            }).catch(err=>{
                console.log(err);
                res.status(500).send("Error getting data list");
            })
    },
    getSingle: (req,res)=>{
        const {id} = req.params;
        const db = req.app.get('db');
        db.get_single({id})
            .then((product)=>{
                res.status(200).send(product);
            }).catch(err=>{
                console.log(err);
                res.status(500).send("ERROR GETTING SINGLE PRODUCT");
            })
    },
    createProduct: (req,res)=>{
        const {name,price,img} = req.body;
        const db = req.app.get('db');
        db.insert_product({name,price,img})
            .then(()=>{
                res.status(200).send();
            }).catch(err=>{
                console.log(err);
                res.status(500).send("Error getting data list");
            });
    },
    deleteProduct: (req,res)=>{
        const {id} = req.params;
        const db = req.app.get('db');
        db.delete_product({id})
            .then(()=>{
                res.status(200).send();
            }).catch(err=>{
                console.log(err);
                res.status(500).send('ERROR DELETING');
            });
    },
    editProduct: (req,res)=>{
        const {id} = req.params;
        const {name,price,img} = req.body;
        const db = req.app.get('db');
        db.edit_product({id,name,price,img})
            .then(()=>{
                res.status(200).send();
            }).catch(err=>{
                console.log(err);
                res.status(500).send('ERROR EDDITING');
            })
    }
}