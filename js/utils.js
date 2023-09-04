function getNamedIndexOfElement(name,element) {

    var id = element.id;

    var firstIndexOfName = id.indexOf(name);

    if(firstIndexOfName===-1) {return -1;}

    var newid = id.substring(firstIndexOfName);
    
    let strIndexOfTarget = newid.indexOf(name) + name.length + 1;

    var namedIndex = newid.substring( strIndexOfTarget, strIndexOfTarget+1 );

    namedIndex = parseInt(namedIndex,10);
    
    return namedIndex;
}