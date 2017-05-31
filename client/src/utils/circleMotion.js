export default function circleMotion( position, size, movement )
{
    // when nothing is highlighted and the up key is pressed, select the last el
    if ( position === -1 && movement === -1 )
    {
        return size - 1;
    }

    return ( position + movement + size ) % size;
}
