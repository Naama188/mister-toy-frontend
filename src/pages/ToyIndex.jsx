import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader } from '../cmps/Loader'
import { PaginationButtons } from '../cmps/PaginationButtons'
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import {
    loadToys,
    removeToy,
    setFilter,
    setSort,
} from '../store/actions/toy.actions'
import { toyService } from '../services/toy.service'
import { PopUp } from '../cmps/PopUp.jsx'


export function ToyIndex() {
    
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const isLoading = useSelector(
        storeState => storeState.toyModule.flag.isLoading
    )
    const [pageIdx, setPageIdx] = useState(0)
    const [toyLabels, setToyLabels] = useState()

    // useEffect(() => {
    //     loadToys(pageIdx)
    //         .then(() => toyService.getToyLabels())
    //         .then(labels => setToyLabels(labels))
    //         .catch(err => {
    //             console.log('err:', err)
    //             showErrorMsg('Cannot load toys')
    //         })
    // }, [filterBy, sortBy, pageIdx])

    useEffect(() => {
        Promise.all([toyService.getToyLabels(), loadToys(pageIdx)])
            .then(([labels]) => setToyLabels(labels))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy, pageIdx])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg('Toy removed'))
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
        setPageIdx(0)
    }

    function onSetSort(sortBy) {
        setSort(sortBy)
    }

    return (
        <section className="toy-index">
            <ToyFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
                sortBy={sortBy}
                onSetSort={onSetSort}
                toyLabels={toyLabels}
            />
            <div style={{ marginBlockStart: '0.5em', textAlign: 'center' }}>
                <button style={{ marginInline: 0 }}>
                    <Link to="/toy/edit">Add Toy</Link>
                </button>
            </div>

            {<PaginationButtons
                pageIdx={pageIdx}
                setPageIdx={setPageIdx}
            />}
            {isLoading && <Loader />}
            {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
            <PopUp footer={<footer>An Image</footer>} isOpen={pageIdx === 2}>
                <img src='./img/TOYSTOREHERO_IMG.png' />
                <button>Send</button>
            </PopUp>

        </section>
    )
}

