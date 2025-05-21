// import { t } from 'i18next'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const TOY_DB = 'toyDB'
const PAGE_SIZE = 4

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

_createToys()




export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getToyLabels,
    getToyLabelCounts,
}

function query(filterBy = {}, sortBy = {}, pageIdx = 0) {
    return storageService.query(TOY_DB).then(toys => {
        let toysToShow = toys
        // Filter by text
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            toysToShow = toysToShow.filter(toy => regExp.test(toy.name))
        }

        // Filter by inStock
        if (typeof filterBy.inStock === 'boolean') {
            // filterBy.inStock
            toysToShow = toysToShow.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
        }

        // Filter by labels
        if (filterBy.labels?.length) {
            toysToShow = toysToShow.filter(toy =>
                filterBy.labels.every(label => toy.labels.includes(label))
            )
        }

        // Sort
        if (sortBy.type) {
            const dir = +sortBy.desc
            toysToShow.sort((a, b) => {
                if (sortBy.type === 'name') {
                    return a.name.localeCompare(b.name) * dir
                } else if (sortBy.type === 'price' || sortBy.type === 'createdAt') {
                    return (a[sortBy.type] - b[sortBy.type]) * dir
                }
            })
        }

        // Pagination
        const startIdx = pageIdx * PAGE_SIZE
        toysToShow = toysToShow.slice(startIdx, startIdx + PAGE_SIZE)

        return toysToShow
    })
}

function getById(toyId) {
    return storageService.get(TOY_DB, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_DB, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_DB, toy)
    } else {
        toy.createdAt = Date.now()
        toy.inStock = true
        return storageService.post(TOY_DB, toy)
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: null,
        labels: [],
        pageIdx: 0,
    }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: _getRandomLabels(),
        inStock: true
    }
}

function getToyLabels() {
    return Promise.resolve(labels)
}

function getToyLabelCounts() {
    return storageService.query(TOY_DB).then(toys => {
        const labelCounts = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (!labelCounts[label]) labelCounts[label] = { total: 0, inStock: 0 }
                labelCounts[label].total++
                if (toy.inStock) labelCounts[label].inStock++
            })
        })
        return labelCounts
    })
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(idx, 1)[0])
    }
    return randomLabels
}



function _createToys() {
    let toys = utilService.loadFromStorage(TOY_DB)
    if (!toys || !toys.length) {
        toys = [
            {
                "name": "Puzzle",
                "price": 70,
                "labels": ["Puzzle", "Box game"],
                "_id": "FHeoH",
                "createdAt": 1721307706470,
                "inStock": false
            },
            {
                "name": "Jeep",
                "price": 90,
                "labels": ["On wheels", "Outdoor"],
                "_id": "r19SU",
                "createdAt": 1720676977009,
                "inStock": false
            },
            {
                "name": "Robot",
                "price": 130,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "_id": "t101",
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "name": "Lego",
                "price": 55,
                "labels": ["Puzzle", "Baby"],
                "_id": "t102",
                "createdAt": 1631032801011,
                "inStock": true
            },
            {
                "name": "Boat",
                "price": 160,
                "labels": ["On wheels", "Battery Powered", "Outdoor"],
                "_id": "t103",
                "createdAt": 1631033801011,
                "inStock": true
            },
            {
                "name": "Hoops",
                "price": 60,
                "labels": ["Box game", "Baby"],
                "_id": "t104",
                "createdAt": 1631034801011,
                "inStock": true
            },
            {
                "name": "Horse Swing",
                "price": 45,
                "labels": ["Art", "Box game"],
                "_id": "t105",
                "createdAt": 1631035801011,
                "inStock": false
            },
            {
                "name": "Dancing Dinosaur",
                "price": 110,
                "labels": ["Battery Powered", "Outdoor"],
                "_id": "t106",
                "createdAt": 1631036801011,
                "inStock": true
            },
            {
                "name": "Rocket",
                "price": 150,
                "labels": ["On wheels", "Box game", "Battery Powered"],
                "_id": "t107",
                "createdAt": 1631037801011,
                "inStock": false
            },
            {
                "name": "Teddy Bear",
                "price": 40,
                "labels": ["Baby", "Doll"],
                "_id": "t108",
                "createdAt": 1631038801011,
                "inStock": true
            },
            {
                "name": "Rubics Cube",
                "price": 65,
                "labels": ["Puzzle", "Art"],
                "_id": "t109",
                "createdAt": 1631039801011,
                "inStock": false
            },
            {
                "name": "Airplane",
                "price": 180,
                "labels": ["Battery Powered", "Outdoor"],
                "_id": "t110",
                "createdAt": 1631040801011,
                "inStock": false
            },
            {
                "name": "Fidget",
                "price": 50,
                "labels": ["Box game", "Baby"],
                "_id": "t111",
                "createdAt": 1631041801011,
                "inStock": false
            },
            {
                "name": "Rabbit",
                "price": 70,
                "labels": ["Art", "Doll"],
                "_id": "t112",
                "createdAt": 1631042801011,
                "inStock": true
            },
            {
                "name": "Duck",
                "price": 220,
                "labels": ["Baby", "Doll"],
                "_id": "t113",
                "createdAt": 1631043801011,
                "inStock": true
            },
            {
                "name": "Slinky",
                "price": 140,
                "labels": ["Baby", "Outdoor"],
                "_id": "t114",
                "createdAt": 1631044801011,
                "inStock": false
            },
            {
                "name": "Unicorn",
                "price": 25,
                "labels": ["Doll", "Baby"],
                "_id": "t115",
                "createdAt": 1631045801011,
                "inStock": true
            },
            {
                "name": "Xylophone",
                "price": 450,
                "labels": ["Baby", "Box Game", "Outdoor"],
                "_id": "t117",
                "createdAt": 1631047801011,
                "inStock": true
            }
        ]


        utilService.saveToStorage(TOY_DB, toys)
    }

}