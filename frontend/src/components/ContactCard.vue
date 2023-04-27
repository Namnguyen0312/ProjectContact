<script>
export default {
    props: {
        contact: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Name:</strong>
            {{ contact.name }}
        </div>
        <div class="p-1">
            <strong>E-mail:</strong>
            {{ contact.email }}
        </div>
        <div class="p-1">
            <strong>Address:</strong>
            {{ contact.address }}
        </div>
        <div class="p-1">
            <strong>Phone:</strong>
            {{ contact.phone }}
        </div>
        <div class="p-1">
            <strong>Description:</strong>
            {{ contact.description }}
        </div>
        <div class="p-1">
            <strong>Favorite Contact:&nbsp;</strong>
            <i v-if="contact.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>