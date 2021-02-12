const { Router } = require('express');
const Sequelize = require('sequelize');
const {Op} = require('sequelize');
const { Item } = require('../../models');
const paginate = require('jw-paginate');

const router = Router();
router.get('/' ,async (req,res) => {
    const limit = 8;
    const page=parseInt(req.query.page) || 1;
    const category = req.query.category;
    const search=req.query.search;
    const offset = (page - 1) * limit;
    if(search.length > 0)
    {
        const queryParam = Sequelize.where(
           Sequelize.fn('lower', Sequelize.col('title')),
           {
              [Op.like]: `%${search}%`,
           }
        );
        var items = await Item.findAndCountAll({limit:limit,offset:offset,where:{title:queryParam}})
    }
    else if(category==='all')
    {
        var items = await Item.findAndCountAll({limit:limit,offset:offset})
    }
    else
        var items = await Item.findAndCountAll({limit:limit,offset:offset,where:{category:category}})

    const rows=items.rows;
    const pager = paginate(items.count, page, limit);
    res.json({pager,items})
   
})

module.exports=router;