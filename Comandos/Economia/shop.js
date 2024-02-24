// const RAM_GET = require('../../core/RAM/RAMGetter');
// const {shop} = require('./shopItems.json');

// const fs = require('fs');

// setTimeout(() => {
// 	const connection = RAM_GET.getDBConnection();

// 	const createTableCategories = `
// 	CREATE TABLE IF NOT EXISTS Categories (
// 		id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
// 		name VARCHAR(255) NOT NULL
// 		);
// 	`;
// 	const createTableItems = `
// 		CREATE TABLE IF NOT EXISTS Items (
// 			id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
// 			category_id INT,
// 			type VARCHAR(255) NOT NULL, 
// 			cost INT NOT NULL,
// 			description TEXT,
// 			FOREIGN KEY (category_id) REFERENCES Categories(id)
// 			);
// 	`;
// 	connection.query(createTableCategories, (err, results, fields) => {
// 		if(err) throw new Error(err);
// 	});
// 	setTimeout(() => {
// 		connection.query(createTableItems, (err, results, fields) => {
// 			if(err) throw new Error(err);
// 		})
// 		setTimeout(() => {
// 			// Leer y procesar el archivo JSON
// 			fs.readFile(__dirname + '/shopItems.json', 'utf8', (err, data) => {
// 				if (err) throw err;
// 				const shopItems = JSON.parse(data).shopItems;
				
// 				for (const [categoryName, subCategories] of Object.entries(shopItems)) {
// 					// Insertar categoría si no existe y obtener su ID
// 					connection.query('INSERT INTO Categories (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)', [categoryName], (err, results) => {
// 						if (err) throw err;
// 						const categoryId = results.insertId;
						
// 						// Iterar sobre subcategorías y elementos
// 						for (var [subCategoryName, items] of Object.entries(subCategories)) {
// 							return console.log(items[0]);
// 							items.shopItems.consumible.food.forEach(item => {
// 								const { type, cost, description } = item;
// 								const insertItemQuery = 'INSERT INTO Items (category_id, type, cost, description) VALUES (?, ?, ?, ?)';
								
// 								connection.query(insertItemQuery, [categoryId, type, cost, description], (error, results) => {
// 									if (error) throw error;
// 									console.log(`Item insertado: ${type}`);
// 								}); 
// 							}).catch(() => { null });
// 							subCategoryName = subCategoryName.replace(/\s+/g, '_');
// 						}
// 					});
// 				}
// 			});
		
// 			process.on('exit', () => connection.end());
// 		}, 11000);
// 	}, 10500);
// }, 10000);
