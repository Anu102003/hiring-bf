import { SearchAddButton } from '../../components/SearchAddButton'
export const EmployeeDetails = () => {

    return (
        <>
            <div className='score-container'>
                <div className='score-card'>
                    <h1>Employee</h1>
                    <SearchAddButton/>
                    <div class="table">
                        <div class="header">
                            <div class="cell">Employe ID</div>
                            <div class="cell">Name</div>
                            <div class="cell">Area of Expertise</div>
                        </div>
                        <div class="row" >
                            <div class="cell">1</div>
                            <div class="cell">Deepsi</div>
                            <div class="cell">Backend</div>
                        </div>
                        <div class="row" >
                            <div class="cell">2</div>
                            <div class="cell">Deepan</div>
                            <div class="cell">Full Stack</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
