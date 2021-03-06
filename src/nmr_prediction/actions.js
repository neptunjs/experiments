import OCL from 'openchemlib/minimal';
import nmrPredictor from 'nmr-predictor';

export const CHANGE_QUERY = 'CHANGE_QUERY';
export function changeQuery(mol) {
    return {
        type: CHANGE_QUERY,
        payload: mol
    };
}

export const MAKE_REQUEST = 'MAKE_REQUEST';
export function makeRequest(options) {
    var mol = OCL.Molecule.fromIDCode(options.query, false);
    if (options.type === 'Proton') {
        return {
            type: MAKE_REQUEST,
            payload: nmrPredictor.spinus(mol.toMolfile())
        };
    } else {
        return {
            type: MAKE_REQUEST,
            payload: nmrPredictor['fetch' + options.type]().then(function () {
                var mol = OCL.Molecule.fromIDCode(options.query, false);
                debugger;
                return nmrPredictor[options.type.toLowerCase()](mol.toMolfile());
            })
        };
    }
}
