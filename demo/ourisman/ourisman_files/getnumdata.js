
_vsrkpd.d = null;

if( _vsrkpd.d ) {
    _vsrkpd.write_numdata('rkpd_CA6phEmmtCsxvgBT', _vsrkpd.d, 3600);
    _vsrkpd.rewrite_document();
}else{
    _vsrkpd.getnum_error( 'rewrite not found' );
}


