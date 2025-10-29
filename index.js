
const heartPositions = [
    
    {x: 80, y: 0}, {x: 100, y: 0}, {x: 120, y: 0}, 
    // *** GAP at x=140 and x=160 *** (The wider center split)
    // Right Curve (3 hearts)
    {x: 200, y: 0}, {x: 220, y: 0}, {x: 240, y: 0}, // Adjusted: Starts at 200, ends at 240
    
    // R2 (10 points total - Perfectly equal spacing, across max width)
    {x: 60, y: 20}, {x: 80, y: 20}, {x: 100, y: 20}, {x: 120, y: 20}, {x: 140, y: 20}, 
    {x: 180, y: 20}, {x: 200, y: 20}, {x: 220, y: 20}, {x: 240, y: 20}, {x: 260, y: 20},
    
    // R3 (13 points - Widest row)
    {x: 40, y: 40}, {x: 60, y: 40}, {x: 80, y: 40}, {x: 100, y: 40}, {x: 120, y: 40}, {x: 140, y: 40}, {x: 160, y: 40}, 
    {x: 180, y: 40}, {x: 200, y: 40}, {x: 220, y: 40}, {x: 240, y: 40}, {x: 260, y: 40}, {x: 280, y: 40},
    
    // R4 (13 points)
    {x: 40, y: 60}, {x: 60, y: 60}, {x: 80, y: 60}, {x: 100, y: 60}, {x: 120, y: 60}, {x: 140, y: 60}, {x: 160, y: 60}, 
    {x: 180, y: 60}, {x: 200, y: 60}, {x: 220, y: 60}, {x: 240, y: 60}, {x: 260, y: 60}, {x: 280, y: 60},
    
    // R5 (13 points)
    {x: 40, y: 80}, {x: 60, y: 80}, {x: 80, y: 80}, {x: 100, y: 80}, {x: 120, y: 80}, {x: 140, y: 80}, {x: 160, y: 80}, 
    {x: 180, y: 80}, {x: 200, y: 80}, {x: 220, y: 80}, {x: 240, y: 80}, {x: 260, y: 80}, {x: 280, y: 80},
    
    // R6 (11 points)
    {x: 60, y: 100}, {x: 80, y: 100}, {x: 100, y: 100}, {x: 120, y: 100}, {x: 140, y: 100}, {x: 160, y: 100}, 
    {x: 180, y: 100}, {x: 200, y: 100}, {x: 220, y: 100}, {x: 240, y: 100}, {x: 260, y: 100},
    
    // R7 (9 points)
    {x: 80, y: 120}, {x: 100, y: 120}, {x: 120, y: 120}, {x: 140, y: 120}, {x: 160, y: 120}, 
    {x: 180, y: 120}, {x: 200, y: 120}, {x: 220, y: 120}, {x: 240, y: 120},
    
    // R8 (7 points)
    {x: 100, y: 140}, {x: 120, y: 140}, {x: 140, y: 140}, {x: 160, y: 140}, 
    {x: 180, y: 140}, {x: 200, y: 140}, {x: 220, y: 140},
    
    // R9 (5 points)
    {x: 120, y: 160}, {x: 140, y: 160}, {x: 160, y: 160}, {x: 180, y: 160}, {x: 200, y: 160},
    
    // R10 (3 points)
    {x: 140, y: 180}, {x: 160, y: 180}, {x: 180, y: 180},
    
    // R11 (1 point - THE SHARP POINT)
    {x: 160, y: 200} 
];


// --- DOCUMENT READY LISTENER (Fixes all errors) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HTML Element Variables (Defined inside)
    const trigger = document.getElementById('whatsapp-trigger');
    const stage = document.getElementById('animation-stage');
    const littleMan = document.getElementById('little-man'); 
    const heartGrid = document.getElementById('heart-grid');
    const hearts = gsap.utils.toArray('.heart'); // Finds all 70 hearts
    const message = document.getElementById('message');   
    
    // Set the initial position and state for all hearts
    gsap.set(hearts, { 
        x: 20, 
        y: heartGrid.offsetHeight / 2, 
        opacity: 0, 
        scale: 0.5 
    });


    // 2. TIMELINE DEFINITION (Defined inside)
    const timeline = gsap.timeline({ 
        paused: true,
        onReverseComplete: () => {
            // Reset ALL elements
            gsap.set(trigger, { opacity: 1 }); 
            gsap.set(stage, { y: 0, opacity: 0 });
            gsap.set(message, { opacity: 0 });
            gsap.set(littleMan, { opacity: 0, y: 10, scale: 0.8 }); 
            gsap.set(hearts, { opacity: 0, scale: 0, x: 20, y: heartGrid.offsetHeight / 2 }); 
        }
    });


    // 3. THE ANIMATION SEQUENCE (Defined inside)
    timeline.to(trigger, { duration: 0.3, opacity: 0, ease: "power2.in" })
            
    .to(stage, { duration: 0.4, opacity: 1, ease: "power2.out" }, "<") 

    .fromTo(littleMan, 
            { opacity: 0, y: 10, scale: 0.8 }, 
            { duration: 0.3, opacity: 1, y: 0, scale: 1, ease: "back.out(1.7)" }, 
            "+=0.2") 

    .to(hearts, { 
        duration: 0.5, 
        opacity: 1, 
        scale: 1, 
        stagger: 0.02, 
        ease: "power2.out",
        
        // Map the hearts to the X,Y coordinates
        x: (i) => heartPositions[i].x, 
        y: (i) => heartPositions[i].y, 
    }, "<") 

    .to(stage, { duration: 0.6, y: -80, ease: "power2.inOut" }, "+=0.7") 

    .to(message, { duration: 0.5, opacity: 1, ease: "power2.out" }, "<+0.2") 


    // 4. THE CLICK LISTENER (Defined inside)
    if (trigger) { 
        trigger.addEventListener('click', () => {
            if (!timeline.isActive()) {
                timeline.restart(); 
            }
        });
    } 
});