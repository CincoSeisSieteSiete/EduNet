// Variables globales
let overlays, body, menuBtn, menuItems;

// Función para toggle del menú principal
function toggle() {
  if (body && overlays && menuBtn && menuItems) {
    body.classList.toggle("overflow");
    overlays.classList.toggle("overlay--active");
    menuBtn.classList.toggle("open");
    menuItems.classList.toggle("open");
  }
}

// Función para cerrar todos los submenús abiertos
function closeAllSubMenus() {
  const allExpandBtns = document.querySelectorAll('.expand-btn');
  const allMegaMenus = document.querySelectorAll('.mega__menu');
  
  allExpandBtns.forEach(btn => {
    btn.classList.remove('open');
  });
  
  allMegaMenus.forEach(menu => {
    menu.classList.remove('open');
  });
}

// Función para limpiar el menú cuando se cambia a desktop
function cleanupMobileMenu() {
  if (menuBtn && menuBtn.classList.contains('open')) {
    toggle();
  }
  closeAllSubMenus();
}

// Event listener para cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar variables globales
  overlays = document.querySelector('.overlay');
  body = document.querySelector('body');
  menuBtn = document.querySelector('.menu__btn');
  menuItems = document.querySelector('.main__menu');

  // Agregar clase expand-btn a elementos que tienen submenús o mega menús
  const liElems = document.querySelectorAll('.main__menu > li');
  liElems.forEach((elem) => {
    const megaMenu = elem.querySelector('.mega__menu');
    const subMenu = elem.querySelector('.sub__menu');
    
    if (megaMenu || subMenu) {
      const firstChild = elem.firstElementChild;
      if (firstChild && !firstChild.classList.contains('expand-btn')) {
        firstChild.classList.add('expand-btn');
      }
    }
  });

  // Click en botón hamburguesa
  if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggle();
    });
  }

  // Cerrar menú con tecla ESC
  window.addEventListener('keydown', (event) => {
    if (!menuItems) return;
    const key = event.key;
    const active = menuItems.classList.contains('open');
    if (key === 'Escape' && active) {
      toggle();
    }
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!menuItems || !menuBtn) return;
    
    let target = e.target;
    let its_menu = target === menuItems || menuItems.contains(target);
    let its_hamburger = target === menuBtn || menuBtn.contains(target);
    let menu_is_active = menuItems.classList.contains('open');
    
    if (!its_menu && !its_hamburger && menu_is_active) {
      toggle();
    }
  });

  // Click en overlay
  if (overlays) {
    overlays.addEventListener('click', () => {
      if (menuItems && menuItems.classList.contains('open')) {
        toggle();
      }
    });
  }

  // Manejar clicks en los botones expand (para móvil)
  const expandBtns = document.querySelectorAll('.expand-btn');
  expandBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // Solo funciona en móvil
      if (window.innerWidth <= 767) {
        e.preventDefault();
        e.stopPropagation();

        const parentLi = btn.parentElement;
        if (!parentLi) return;

        const megaMenu = parentLi.querySelector('.mega__menu');
        const subMenu = parentLi.querySelector('.sub__menu');
        const menuToToggle = megaMenu || subMenu;
        
        if (!menuToToggle) return;

        const parentUl = parentLi.parentElement;
        if (!parentUl) return;

        // Cerrar otros menús del mismo nivel
        parentUl.querySelectorAll(':scope > li').forEach((siblingLi) => {
          if (siblingLi !== parentLi) {
            const siblingBtn = siblingLi.querySelector('.expand-btn');
            const siblingMegaMenu = siblingLi.querySelector('.mega__menu');
            const siblingSubMenu = siblingLi.querySelector('.sub__menu');
            
            if (siblingBtn) siblingBtn.classList.remove('open');
            if (siblingMegaMenu) siblingMegaMenu.classList.remove('open');
            if (siblingSubMenu) siblingSubMenu.classList.remove('open');
          }
        });

        // Toggle del menú actual
        btn.classList.toggle('open');
        menuToToggle.classList.toggle('open');
      }
    });
  });

  // Manejar cambios de tamaño de ventana
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Si cambiamos a desktop (más de 767px)
      if (window.innerWidth > 767) {
        cleanupMobileMenu();
      }
    }, 250);
  });
});

// Exportar funciones si se usa como módulo
export { toggle, closeAllSubMenus, cleanupMobileMenu };