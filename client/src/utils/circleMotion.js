export default function circleMotion( position, size, movement )
{
    return ( position + movement + size ) % size;
}
